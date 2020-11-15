class AttendancesController < ApplicationController
  before_action :get_model
  before_action :get_attendance, only: [:show, :update, :destroy]

  def index
    @attendances = @klass.attendances.page(params[:page]).filter(params[:date])

    render json: { records: @attendances, meta: meta_info }
  end

  def show
    serialized_attendance = @attendance.as_json
    serialized_attendance[:extra_info] = @attendance.extra_info

    render json: serialized_attendance
  end

  def create
    attendance = @klass.new(attendance_params)

    if attendance.save
      head 201
    else
      render json: attendance.errors.full_messages, status: 422
    end
  end

  def update
    if @attendance.update(attendance_params)
      head 200
    else
      render json: @attendance.errors
    end
  end

  def destroy
    @attendance.destroy

    head 204
  end

  private

  def get_model
    @klass = case params[:mode]
    when 'adult' then AdultAttendance
    when 'teens' then TeenageChurchAttendance
    when 'junior church' then JuniorChurchAttendance
    end
  end

  def get_attendance
    @attendance = @klass.find(params[:id])
  end

  def attendance_params
    params.require(params[:mode]).permit(
      :day, :service_id, :male, :female, :children,
      online: [:facebook, :youtube], newcomers: [:male, :female],
      decisions: [:male, :female], extra_info_attributes: [:service_title]
    )
  end

  def meta_info
    {
      current_page: @attendances.current_page,
      total_pages: @attendances.total_pages
    }
  end
end
