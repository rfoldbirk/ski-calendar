defmodule App.Repo.Migrations.CreatePersons do
  use Ecto.Migration

  def change do
    create table(:persons) do
      add :name, :string
      add :firstname, :string
      add :lastname, :string
      add :tlf_nr, :string
      add :age, :integer
      add :week_nr, :integer
      add :is_instructor, :boolean, default: false, null: false
      add :parent_id, references(:persons, on_delete: :nothing)

      timestamps()
    end
  end
end
