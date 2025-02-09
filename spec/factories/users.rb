FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "foo_#{i}@gmail.com"}
    password {:password}
  end
end