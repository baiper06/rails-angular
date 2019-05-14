FROM ruby:2.6.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /backend
WORKDIR /backend
COPY . /backend

RUN gem update --system && gem install bundler
RUN bundle install
