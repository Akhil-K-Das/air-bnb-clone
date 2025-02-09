class Profile < ApplicationRecord
  belongs_to :user

  geocoded_by :address
  after_validation :geocode, if: -> { address_1.present? && latitude.blank? && longitude.blank?}

  def address
    # [address_1, address_2, city, state, country, zip_code].compact.join(', ')
    [state, country].compact.join(', ')
  end
end
