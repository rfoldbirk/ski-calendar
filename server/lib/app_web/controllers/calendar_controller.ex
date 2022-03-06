defmodule AppWeb.API.CalendarController do
  use AppWeb, :controller

  def get_team_by_id(conn, %{"id" => id}) do
    IO.puts "tissemand!!!"

    res = API.Team.get_team_by_id(id)

    json(conn, res)
  end


  def add_team_and_lessons(conn, team_lessons) do
    API.Team.add_team_and_lessons(team_lessons)

    json(conn, "ok")
  end

  def add_lessons(conn, data) do
    API.Team.add_lessons(Map.get(data, "team_id"), Map.get(data, "lessons"))

    json(conn, "ok")
  end

  def weekly_schedule(conn, params) do
    week_nr = Map.get(params, "week")
    json(conn, API.Team.weekly_schedule(week_nr))
  end


  def add_persons_to_team(conn, params) do

  end
end
