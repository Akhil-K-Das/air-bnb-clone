# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    def show
      user = User.find(params[:id])
      respond_to do |format|
        format.json do
          render json: user.to_json, status: :ok 
        end
      end
    rescue ActiveRecord::RecordNotFound
      respond_to do |format|
        format.json do
          render json: { message: "User not found" }, status: :not_found
        end
      end
    end
  end
end