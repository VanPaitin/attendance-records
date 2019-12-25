class AttendancesController < ApplicationController
  def index
    klass = get_model(params[:mode])

    attendances = klass.page(params[:page])

    render json: attendances
  end

  private

  def get_model(mode)
    case mode
    when 'adult' then AdultAttendance
    when 'teens' then TeenageChurchAttendance
    when 'junior church' then JuniorChurchAttendance
    end
  end
end
