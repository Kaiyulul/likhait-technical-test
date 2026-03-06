class Expense < ApplicationRecord
  belongs_to :category

  validates :date, presence: true
  validate :date_cannot_be_in_the_future

  private

  def date_cannot_be_in_the_future
    return if date.blank?
    return unless date > Date.current

    errors.add(:date, "cannot be in the future. Please use today's date or earlier.")
  end
end
