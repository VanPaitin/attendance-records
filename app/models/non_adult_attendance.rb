class NonAdultAttendance < ApplicationRecord
  has_one :extra_info, as: :attendance
  accepts_nested_attributes_for :extra_info
end
