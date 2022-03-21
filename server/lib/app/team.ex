defmodule Team do
  use Ecto.Schema
  import Ecto.Changeset

  schema "teams" do
    field :title, :string
    field :description, :string
    field :week, :integer
    field :instructor_id_list, :string

    has_many :lessons, Lesson

    many_to_many :instructors, Person, join_through: "teams_persons"
    many_to_many :students, Person, join_through: "teams_persons"

    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:title, :week, :description, :instructor_id_list])
    |> validate_required([:title, :week, :instructor_id_list])
  end
end


defmodule TeamPerson do
  use Ecto.Schema
  import Ecto.Changeset

  schema "teams_persons" do
    belongs_to :team, Team
    belongs_to :person, Person
    field :is_student, :boolean, default: true

    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:team, :person, :is_student])
    |> validate_required([:team, :person])
  end
end




defmodule API.Team do
  import Ecto.Query, only: [from: 2]

  defp _add_lessons(team, lessons) do
    Enum.each(lessons, fn lesson ->
      lesson = %Lesson{
        day: Map.get(lesson, "day"),
        note: Map.get(lesson, "note"),
        start_time: Map.get(lesson, "start_time"),
        end_time: Map.get(lesson, "end_time"),
        team: team,
      }

      App.Repo.insert!(lesson)
    end)
  end

  defp filter_persons(instructors, select_only_students, id_list) do
    Enum.map(instructors, fn inst ->
      %{
        id: inst.id,
        firstname: inst.firstname,
        lastname: inst.lastname,
        age: inst.age,
        tlf_nr: inst.tlf_nr,
        is_instructor: inst.is_instructor,
      }
    end)
    |> Enum.filter(fn user ->
      ids = String.split(id_list, "-")
      Enum.find(ids, fn id ->
        id = String.to_integer(id)
        (id == user.id and not select_only_students) or (id != user.id and select_only_students)
      end)
    end)
  end

  defp filter_lessons(lessons) do
    Enum.map(lessons, fn les ->
      %{
        id: les.id,
        note: les.note,
        day: les.day,
        start_time: les.start_time,
        end_time: les.end_time,
      }
    end)
  end


  defp filter_team(team) do
    %{
      id: team.id,
      title: team.title,
      description: team.description,
      instructors: filter_persons(team.instructors, false, team.instructor_id_list),
      students: filter_persons(team.students, true, team.instructor_id_list),
      lessons: filter_lessons(team.lessons)
    }
  end

  def add_lesson(lesson) do
    team = App.Repo.get(Team, Map.get(lesson, "team_id"))
    _add_lessons(team, [lesson])
    %{status: :true}
  end

  def update_lesson(id, st, et) do
  	{res, _} = App.Repo.get(Lesson, id)
      |> Ecto.Changeset.change(%{start_time: st, end_time: et})
      |> App.Repo.update()

    if res == :ok do
      %{status: :true}
    else
      %{status: :false, errors: ["ander det ikke"]}
    end
  end

  def update_team(id, title, desc) do
    {res, _} = App.Repo.get(Team, id)
      |> Ecto.Changeset.change(%{title: title, description: desc})
      |> App.Repo.update()
    
    if res == :ok do
      %{status: :true}
    else
      %{status: :false, errors: ["ander det ikke"]}
    end
  end

  def get_lesson(id) do
    lesson = App.Repo.get(Lesson, id)
	filter_lessons([lesson])
      |>Enum.at(0)
  end

  def delete_lesson(id) do
	lesson = App.Repo.get(Lesson, id)
	case App.Repo.delete lesson do
	  {:ok, _} -> %{status: :true}
	  {:error} -> %{status: :false, errors: ["aner det ikke"]}
	end
  end


  def get_team_by_id(id?) do
    team = App.Repo.get(Team, id?) |> App.Repo.preload([:instructors, :lessons, :students])

    if team do
      %{status: :true, team: filter_team(team)}
    else
      %{status: :false, errors: ["no such team"]}
    end
  end


  def add_lessons(team_id, lessons) do
    team = App.Repo.get(Team, team_id)

    if team do
      _add_lessons(team, lessons)
    end
  end


  def add_team_and_lessons(team_lessons) do
    IO.inspect team_lessons
    team = Map.take(team_lessons, ["title", "week", "description"])
    lessons = Map.get(team_lessons, "lessons")

    id_list = Map.get(team_lessons, "instructors") |> Enum.join("-")
    team = Map.put(team, "instructor_id_list", id_list)

    changeset = Team.changeset(%Team{}, team)
    {res, team} = App.Repo.insert(changeset)

    if res == :ok do
      Enum.each ["instructors", "students"], fn x ->
        user_ids = Map.get(team_lessons, x)
        # Tilføjer instruktører
        Enum.each(user_ids, fn user_id ->
          user = App.Repo.get(Person, user_id)

          if user do
            App.Repo.insert(%TeamPerson{
              team: team,
              person: user,
              is_student: if x == "students" do true else false end,
            })
          end
        end)
      end



      _add_lessons(team, lessons)
      :ok
    else
      :error
    end
  end

  defp get_team_by_week(week) do
    team_with_lessons =
      from t in Team,
        join: l in Lesson, as: :lesson, on: l.team_id == t.id

    from [t, lesson: l] in team_with_lessons, where: t.week == ^week, select: %{
      lesson_id: l.id,
      team_id: t.id,
      title: t.title,
      week: t.week,
      day: l.day,
      start_time: l.start_time,
      end_time: l.end_time
    }
  end

  def weekly_schedule(week_nr) do
    get_team_by_week(week_nr)
      |> App.Repo.all
  end
end
