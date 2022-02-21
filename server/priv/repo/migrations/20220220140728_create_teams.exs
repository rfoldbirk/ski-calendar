defmodule App.Repo.Migrations.CreateTeams do
  use Ecto.Migration

  def change do
    create table(:teams) do
      add :title, :string
      add :description, :string
      add :week, :integer

      timestamps()
    end

    create table(:lessons) do
      add :team_id, references(:teams, on_delete: :delete_all), null: false
      add :note, :string
      add :day, :string
      add :start_time, :string
      add :end_time, :string
    end


    create table(:teams_persons) do
      add :team_id, references(:teams)
      add :person_id, references(:persons)
    end

    create unique_index(:teams_persons, [:team_id, :person_id])
  end
end
