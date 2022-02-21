defmodule AppWeb.API.CalendarController do
  use AppWeb, :controller

  def add_team_and_lessons(conn, team_lessons) do
    API.Team.add_team_and_lessons(team_lessons)

    json(conn, "ok")
  end

  def add_lessons(conn, data) do
    API.Team.add_lessons(Map.get(data, "team_id"), Map.get(data, "lessons"))

    json(conn, "ok")
  end

  def get_team_lessons_by_week(conn, params) do
    json(conn, API.Team.get_team_lessons_by_week(Map.get(params, "week")))
  end
end
