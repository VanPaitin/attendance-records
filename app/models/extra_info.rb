class ExtraInfo < ApplicationRecord
  belongs_to :attendance, polymorphic: true
end
