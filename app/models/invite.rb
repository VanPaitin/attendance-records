class Invite < ApplicationRecord
  has_secure_token

  validates_uniqueness_of :email
end
