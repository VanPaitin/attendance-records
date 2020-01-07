class AttendancesController < ApplicationController
  before_action :get_model

  def index
    attendances = @klass.joins(:service).select(
      "#{@klass.table_name}.*", 'services.name as service_name'
    ).page(params[:page]).order(day: :desc)

    render json: attendances
  end

  def create
    attendance = @klass.new(attendance_params)

    if attendance.save
      head 201
    else
      render json: attendance.errors, status: 422
    end
  end

  private

  def get_model
    @klass = case params[:mode]
    when 'adult' then AdultAttendance
    when 'teens' then TeenageChurchAttendance
    when 'junior church' then JuniorChurchAttendance
    end
  end

  def attendance_params
    params.require(params[:mode]).permit(
      :day, :service_id, :male, :female, :children,
      online: [:facebook, :youtube], newcomers: [:male, :female],
      decisions: [:male, :female], extra_info_attributes: [:service_title]
    )
  end
end
