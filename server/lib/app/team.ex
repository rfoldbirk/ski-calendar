defmodule Team do
  use Ecto.Schema
  import Ecto.Changeset

  schema "teams" do
    field :title, :string
    field :description, :string
    field :week, :integer

    has_many :lessons, Lesson

    many_to_many :instructors, Person, join_through: "teams_persons"
    many_to_many :students, Person, join_through: "teams_persons"

    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:title, :week, :description])
    |> validate_required([:title, :week])
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


  def add_lessons(team_id, lessons) do
    team = App.Repo.get(Team, team_id)

    if team do
      _add_lessons(team, lessons)
    end
  end


  def add_team_and_lessons(team_lessons) do
    team = Map.take(team_lessons, ["title", "week"])
    lessons = Map.get(team_lessons, "lessons")

    changeset = Team.changeset(%Team{}, team)
    {res, team} = App.Repo.insert!(changeset)

    if res == :ok do
      _add_lessons(team, lessons)
      :ok
    else
      :error
    end
  end

  def get_team_lessons_by_week(week_nr) do
    IO.inspect App.Repo.get(Team, 2) |> App.Repo.preload(:lessons)

    teams = App.Repo.all(
      from t in Team,
      where: t.week == ^week_nr or t.week == 0,
      preload: :lessons
    ))

    %{"something": true}
  end
end
