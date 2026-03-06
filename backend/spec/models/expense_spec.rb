require 'rails_helper'

RSpec.describe Expense, type: :model do
  let(:category) { create(:category) }

  it "is valid with today's date" do
    expense = described_class.new(
      description: "Coffee",
      amount: 5.50,
      date: Date.current,
      category: category
    )

    expect(expense).to be_valid
  end

  it "is invalid with a future date" do
    expense = described_class.new(
      description: "Future subscription",
      amount: 20.00,
      date: Date.current + 1.day,
      category: category
    )

    expect(expense).not_to be_valid
    expect(expense.errors[:date]).to include(
      "cannot be in the future. Please use today's date or earlier."
    )
  end
end
