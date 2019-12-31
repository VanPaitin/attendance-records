class AdultAttendance < ApplicationRecord
  include Attendance

  belongs_to :service

  %i(male female children facebook youtube male_newcomers female_newcomers male_decisions female_decisions).each do |attr|
    validates_numericality_of attr, only_integer: true, allow_nil: true
  end

  store_accessor :online, :facebook, :youtube
  store_accessor :newcomers, :male, :female, suffix: true
  store_accessor :decisions, :male, :female, suffix: true
end
