defmodule App.Repo.Migrations.AddTimestamps do
  use Ecto.Migration

  def change do
    alter table(:lessons) do
      timestamps()
    end

    alter table(:teams_persons) do
      timestamps()
    end
  end
end
