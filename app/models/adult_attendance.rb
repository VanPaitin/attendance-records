class AdultAttendance < ApplicationRecord
  include Attendance

  store_accessor :online, :facebook, :youtube
  store_accessor :newcomers, :male, :female, suffix: true
  store_accessor :decisions, :male, :female, suffix: true

  STORED_ACCESSORS = %i(facebook youtube male_newcomers female_newcomers male_decisions female_decisions)
  NUMERIC_ATTRIBUTES = %i(male female children) | STORED_ACCESSORS

  NUMERIC_ATTRIBUTES.each do |attr|
    validates_numericality_of attr, only_integer: true, allow_nil: true
  end

  validate :ensure_correct_weekday, if: proc { |attendance|
    attendance.service_id && !attendance.any_weekday?
  }

  before_validation :set_stored_accessors

  scope :attendances, -> do
    joins(:service).left_joins(:extra_info).select("#{table_name}.*", attendances_sql).order(day: :desc)
  end

  scope :within_date, ->(held_since:, held_before:) do
    where(day: held_since..held_before) if held_since.present?
  end

  scope :by_service, -> service_id { where(service_id: service_id) }

  delegate :name, :weekday, :any_weekday?, to: :service, allow_nil: :true

  class << self
    def attendances_sql
      <<~SQL
        CASE
          WHEN services.name = 'Special Service' THEN extra_infos.service_title
          ELSE services.name
        END as service_name
      SQL
    end
  end

  private

  def set_stored_accessors
    STORED_ACCESSORS.each do |stored_accessor|
      send "#{stored_accessor}=", send(stored_accessor).presence
    end
  end

  def ensure_correct_weekday
    unless day.strftime("%A") == weekday
      errors[:base] << "#{name} normally holds on a #{weekday}. Please review. "\
      "If you are sure of what you are doing, you may choose Special Service as the service type"
    end
  end
end
