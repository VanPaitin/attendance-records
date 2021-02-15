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

ActiveRecord::Schema.define(version: 2021_02_15_062836) do

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

  create_table "blacklisted_tokens", force: :cascade do |t|
    t.string "token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["token"], name: "index_blacklisted_tokens_on_token", unique: true
  end

  create_table "extra_infos", force: :cascade do |t|
    t.text "service_title"
    t.string "attendance_type"
    t.bigint "attendance_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "invites", force: :cascade do |t|
    t.string "email"
    t.bigint "role_id", null: false
    t.integer "sender_id"
    t.integer "recipient_id"
    t.string "token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["role_id"], name: "index_invites_on_role_id"
    t.index ["token"], name: "index_invites_on_token", unique: true
  end

  create_table "non_adult_attendances", force: :cascade do |t|
    t.date "day"
    t.bigint "service_id", null: false
    t.string "type"
    t.integer "male"
    t.integer "female"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["service_id"], name: "index_non_adult_attendances_on_service_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.string "weekday"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_roles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_user_roles_on_user_id_and_role_id", unique: true
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "adult_attendances", "services"
  add_foreign_key "invites", "roles"
  add_foreign_key "non_adult_attendances", "services"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
end
