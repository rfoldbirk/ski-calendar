defmodule AppWeb.API.CalendarController do
  use AppWeb, :controller

  # Lessons

  def update_lesson(conn, %{"lesson_id" => id, "start_time" => st, "end_time" => et}) do
	res = API.Team.update_lesson(id, st, et)
	json conn, res
  end

  def add_lesson(conn, lesson) do
	res = API.Team.get_lesson(lesson)
	json conn, res
  end

  def get_lesson(conn, %{"id" => id}) do
  	res = API.Team.get_lesson(id)

	json conn, res
  end

  def delete_lesson(conn, %{"id" => id}) do
	res = API.Team.delete_lesson(id)
	IO.inspect(res)
	json(conn, res)   
	end

  # Teams
  def update_team(conn, %{"id" => id, "title" => title, "desc" => desc}) do
    res = API.Team.update_team(id, title, desc)
    json conn, res
  end

  def get_team_by_id(conn, %{"id" => id}) do
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
