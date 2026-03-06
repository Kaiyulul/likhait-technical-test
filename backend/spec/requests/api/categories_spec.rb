require 'rails_helper'

RSpec.describe "Api::Categories", type: :request do
  describe "GET /api/categories" do
    let!(:food) { Category.create!(name: "Food") }
    let!(:transport) { Category.create!(name: "Transport") }
    let!(:supplies) { Category.create!(name: "Supplies") }

    it "returns all categories" do
      get "/api/categories"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
      expect(json.map { |c| c["name"] }).to include("Food", "Transport", "Supplies")
    end

    it "returns categories in alphabetical order" do
      get "/api/categories"

      json = JSON.parse(response.body)
      expect(json.map { |c| c["name"] }).to eq([ "Food", "Supplies", "Transport" ])
    end
  end

  describe "POST /api/categories" do
    it "creates a category with icon" do
      post "/api/categories", params: {
        category: {
          name: "Subscriptions",
          icon: "📺"
        }
      }, as: :json

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("Subscriptions")
      expect(json["icon"]).to eq("📺")
      expect(Category.exists?(name: "Subscriptions")).to be(true)
    end

    it "returns validation errors for duplicate name" do
      Category.create!(name: "Food")

      post "/api/categories", params: { category: { name: "Food", icon: "🍔" } }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to be_present
    end
  end
end
