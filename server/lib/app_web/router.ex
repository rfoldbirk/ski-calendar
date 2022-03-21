defmodule AppWeb.Router do
  use AppWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {AppWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AppWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/", AppWeb.API do
    pipe_through :api

    get "update", PageController, :fetch_from_github

    scope "/users" do
      post "/add", PersonController, :add
      post "/search", PersonController, :search
      delete "/delete", PersonController, :delete
    end

    scope "/teams" do
      get "/id/:id", CalendarController, :get_team_by_id
      get "/weekly_schedule/:week", CalendarController, :weekly_schedule
      post "/new", CalendarController, :add_team_and_lessons
      post "/lessons", CalendarController, :add_lessons
      post "/update", CalendarController, :update_team
    end

	scope "/lessons" do
		get "/:id", CalendarController, :get_lesson 
		post "/add", CalendarController, :add_lesson
		post "/update", CalendarController, :update_lesson
		delete "/delete/:id", CalendarController, :delete_lesson
	end
  end

  # Other scopes may use custom stacks.
  # scope "/api", AppWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: AppWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
