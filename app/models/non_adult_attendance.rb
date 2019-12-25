class NonAdultAttendance < ApplicationRecord
  has_one :extra_info, as: :attendance
end
