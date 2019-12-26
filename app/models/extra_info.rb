class ExtraInfo < ApplicationRecord
  belongs_to :attendance, polymorphic: true

  validates_presence_of :service_title
end
