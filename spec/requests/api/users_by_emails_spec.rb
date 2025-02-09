# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Api::UsersByEmails", type: :request do
  describe "GET show" do
    let(:headers) do
       { "ACCEPT" => "application/json" }
    end
    context "when user exists" do
      it "returns success status" do
        user = create(:user)
        # get api_users_by_email_path(email: user.email), headers: headers
        get api_users_by_email_path, params: {email: user.email}, headers: headers
        expect(response).to be_successful
      end
    end

    context "when user does not exist" do
      it "returns not found status" do
        # get api_users_by_email_path(email: "junk@example"), headers: headers
        get api_users_by_email_path, params: {email: "junk@example.com"}, headers: headers
        expect(response.status).to eq 404
      end

    end

  end
end