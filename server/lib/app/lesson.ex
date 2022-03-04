defmodule Lesson do
  use Ecto.Schema
  import Ecto.Changeset

  schema "lessons" do
    belongs_to :team, Team

    field :note, :string
    field :day, :string
    field :start_time, :string
    field :end_time, :string

    timestamps()
  end

  @doc false
  def changeset(lesson, attrs) do
    lesson
    |> cast(attrs, [:note, :day, :start_time, :end_time])
    |> validate_required([:day, :start_time, :end_time])
  end
end
