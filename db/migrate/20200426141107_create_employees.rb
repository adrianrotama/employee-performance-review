class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :email,              null: false
      t.string :password_digest,    null: false
      t.string :name,               null: false
      t.integer :role,              null: false, default:0
      t.timestamps
    end
    add_index :employees, :email, unique: true
  end
end
