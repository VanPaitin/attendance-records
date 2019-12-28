# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_24_233730) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adult_attendances", force: :cascade do |t|
    t.date "day"
    t.bigint "service_id", null: false
    t.integer "male"
    t.integer "female"
    t.integer "children"
    t.jsonb "online"
    t.jsonb "newcomers"
    t.jsonb "decisions"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["service_id"], name: "index_adult_attendances_on_service_id"
  end

  create_table "extra_infos", force: :cascade do |t|
    t.text "service_title"
    t.string "attendance_type"
    t.bigint "attendance_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "non_adult_attendances", force: :cascade do |t|
    t.date "day"
    t.string "type"
    t.integer "male"
    t.integer "female"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "adult_attendances", "services"
end
