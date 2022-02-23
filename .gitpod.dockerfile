FROM gitpod/workspace-full

# installér elixir & erlang
RUN wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && sudo dpkg -i erlang-solutions_2.0_all.deb && sudo apt-get update && sudo apt-get install elixir -y
RUN sudo apt-get install postgresql postgresql-contrib
RUN sudo apt-get install erlang-xmerlsudo
RUN sudo apt-get install inotify-tools -y
RUN sudo apt install erlang-dev erlang-parsetools -y
RUN mix local.hex --force
RUN mix archive.install hex phx_new --force