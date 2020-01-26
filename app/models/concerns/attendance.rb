module Attendance
  extend ActiveSupport::Concern

  included do
    belongs_to :service
    has_one :extra_info, as: :attendance, dependent: :destroy

    accepts_nested_attributes_for :extra_info, update_only: true

    validates :day, presence: true,
              timeliness: { on_or_before: lambda { Date.current }, type: :date }
    validates :day, uniqueness: {
                scope: :service,
                message: "selected is the same as that of a previously recorded attendance for this service."
              }, unless: :any_weekday?
  end
end
