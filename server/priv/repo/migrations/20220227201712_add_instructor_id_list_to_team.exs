defmodule App.Repo.Migrations.AddInstructorIdListToTeam do
  use Ecto.Migration

  def change do
    alter table(:teams) do
      add :instructor_id_list, :string
    end
  end
end
