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
    end
  end
end
