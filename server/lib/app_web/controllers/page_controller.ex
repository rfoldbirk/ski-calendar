defmodule AppWeb.PageController do
  use AppWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end


  def fetch_from_github(conn, _params) do
    System.cmd("git pull", [])

    json(conn, "updating")
  end
end
