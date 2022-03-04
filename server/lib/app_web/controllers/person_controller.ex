defmodule AppWeb.API.PersonController do
  use AppWeb, :controller

  def add(conn, person?) do
    # person? skal bare opfylde alle informationer i en person.

    {res, data} = API.Person.add(person?)

    case res do
      :ok -> json(conn, %{status: true, id: data.id})
      :error ->
        IO.inspect data.errors
        json(conn, %{status: false, errors: data.errors})
    end
  end

  def search(conn, %{ "name" => name, "weeknr" => wnr, "is_instructor" => ii}) do
    # søg efter enten navn efternavn uge
    users = API.Person.search(name, wnr, ii)

    json(conn, %{status: true, users: users})
  end

  def delete(conn, %{ "id" => id}) do
    {res, _data} = API.Person.delete(id)
    json(conn, %{status: res})
  end
end
