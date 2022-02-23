FROM gitpod/workspace-full
FROM gitpod/workspace-postgres
# installér elixir & erlang
RUN wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && sudo dpkg -i erlang-solutions_2.0_all.deb && sudo apt-get update && sudo apt-get install elixir -y
RUN mix local.hex --force
RUN mix archive.install hex phx_new --force