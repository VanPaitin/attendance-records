class Invite < ApplicationRecord
  belongs_to :role

  has_secure_token

  validates_uniqueness_of :email
end
