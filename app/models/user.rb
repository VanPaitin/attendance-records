class User < ApplicationRecord
  paginates_per 10

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  has_many :user_roles
  has_many :roles, through: :user_roles

  before_save { self.email = email.downcase }

  validates_presence_of :first_name, :last_name, :roles
  validates :email, presence: true, length: { maximum: 255 },
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
end
