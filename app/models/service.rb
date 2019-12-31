class Service < ApplicationRecord
  def any_weekday?
    weekday == 'any'
  end
end
