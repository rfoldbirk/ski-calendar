defmodule Person do
  use Ecto.Schema
  import Ecto.Changeset

  schema "persons" do
    field :age, :integer
    field :firstname, :string
    field :instructor, :boolean, default: false
    field :lastname, :string
    has_one :parent, Person

    timestamps()
  end

  @doc false
  def changeset(person, attrs) do
    person
    |> cast(attrs, [:firstname, :lastname, :age, :instructor])
    |> validate_required([:firstname, :lastname, :age, :instructor])
  end
end
