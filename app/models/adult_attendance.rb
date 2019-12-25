class AdultAttendance < ApplicationRecord
  belongs_to :service
  has_one :extra_info, as: :attendance
end
