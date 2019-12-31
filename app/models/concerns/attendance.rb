module Attendance
  extend ActiveSupport::Concern

  included do
    has_one :extra_info, as: :attendance

    accepts_nested_attributes_for :extra_info

    validates :day, presence: true,
              timeliness: { on_or_before: lambda { Date.current }, type: :date }
  end
end
