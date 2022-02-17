defmodule App.Repo.Migrations.CreatePersons do
  use Ecto.Migration

  def change do
    create table(:persons) do
      add :firstname, :string
      add :lastname, :string
      add :age, :integer
      add :week_nr, :integer
      add :instructor, :boolean, default: false, null: false

      timestamps()
    end
  end
end
