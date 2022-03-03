defmodule Person do
  use Ecto.Schema
  import Ecto.Changeset

  schema "persons" do
    field :name, :string
    field :firstname, :string
    field :lastname, :string
    field :tlf_nr, :string
    field :age, :integer
    field :week_nr, :integer
    field :is_instructor, :boolean, default: false
    field :parent_id, :id

    many_to_many :teaching_team, Team, join_through: "teams_persons"
    many_to_many :student_team, Team, join_through: "teams_persons"


    timestamps()
  end

  @doc false
  def changeset(person, attrs \\ %{}) do
    person
    |> cast(attrs, [:name, :firstname, :lastname, :tlf_nr, :week_nr, :age, :is_instructor, :parent_id])
    |> validate_required([:firstname, :lastname, :tlf_nr, :week_nr, :age, :is_instructor])
  end
end


defmodule API.Person do
  import Ecto.Query, only: [from: 2]

  defp perm_to_add_person(person) do
    my_person = App.Repo.one(
      from p in Person,
      where:
        p.firstname == ^person.firstname and
        p.lastname == ^person.lastname
        # p.week_nr == ^person.week_nr
    )

    # Returner ok, hvis der ikke findes nogen, fordi så er det ok at oprette en ny person i systemet
    case my_person do
      nil -> :ok
      _ -> :error
    end
  end



  def add(person) do
    # Validér med changeset

    # Kombinér navn
    fne = Map.get(person, "firstname")
    lne = Map.get(person, "lastname")
    person = Map.put_new(person, "name", "#{fne} #{lne}")

    changeset = Person.changeset(%Person{}, person)
    can_create? = perm_to_add_person(changeset.changes)

    case can_create? do
      :ok ->
        {res, data} = App.Repo.insert(changeset)
        case res do
          :ok -> {res, data}
          :error -> {res, %{errors: ["missing_fields"]}}
        end
      _ ->
        {:error, %{errors: [:already_exists]}}
    end
  end


  def search(name, wnr, ii) do
    name = String.downcase(name)
    name = "%#{name}%"

    users = from(p in Person,
      where: like(fragment("lower(?)", p.name), ^name),
      select: %{
        id: p.id,
        firstname: p.firstname,
        lastname: p.lastname,
        is_instructor: p.is_instructor,
        nr: p.tlf_nr,
        week: p.week_nr,
      }
    ) |> App.Repo.all

    # Filtrer efter uge nr og om personen er en instruktør
    # Hvis man søger efter instruktører filtrere den ikke uger
    users = Enum.filter(users, fn(user) -> (Map.get(user, :week) == wnr and not ii) or ii end)
    Enum.filter(users, fn(user) -> Map.get(user, :is_instructor) == ii end)
  end


  def update(_person_id, _updated_attrs) do
    :true
  end


  # Fjerner en person fra databasen via id
  def delete(person_id) do
    person = App.Repo.get(Person, person_id)

    if person == nil do
      {false, ["no_match"]}
    else
      case App.Repo.delete person do
        {:ok, _} -> {true, nil}
        {:error, changeset} -> {false, changeset.errors}
      end
    end
  end
end
