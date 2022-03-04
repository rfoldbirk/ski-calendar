defmodule AppWeb.PersonControllerTest do
  use AppWeb.ConnCase

  @moduletag :personer

  describe "opret en masse brugere" do
    test "opret rasmus", %{conn: conn} do
      real_rasmus = post(conn, "/users/add", %{
        firstname: "Rasmus",
        lastname: "Foldberg",
        tlf_nr: "+4560210409",
        age: 21,
        week_nr: 2,
        instructor: true,
        parent_id: nil,
      })
      real_rasmus_again = post(conn, "/users/add", %{
        firstname: "Rasmus",
        lastname: "Foldberg",
        tlf_nr: "+4560210409",
        age: 21,
        week_nr: 2,
        instructor: true,
        parent_id: nil,
      })

      assert json_response(real_rasmus, 200)["res"] == "ok" and json_response(real_rasmus_again, 200)["res"] == "error"
    end
    test "mangler oplysninger", %{conn: conn} do
      faulty_person = post(conn, "/users/add", %{
        firstname: "Rasmus",
        lastname: "Foldberg",
        age: 21,
        week_nr: 2,
        instructor: true,
        parent_id: nil,
      })
      assert json_response(faulty_person, 200)["res"] == "error"
    end
  end

  # describe "sletning af brugere" do
  #   test "slet rasmus", %{conn: conn} do
  #     rr = post(conn, "/users/add", %{
  #       firstname: "Rasmus",
  #       lastname: "Foldberg",
  #       tlf_nr: "+4560210409",
  #       age: 21,
  #       week_nr: 2,
  #       instructor: true,
  #       parent_id: nil,
  #     })

  #     dr = delete(conn, "/users/delete", %{id: 0})

  #     assert json_response(dr, 200)["res"] == "ok"
  #   end
  # end
end
