class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.references :employee_to
      t.references :employee_from
      t.integer :rating,             null: false, default: 0
      t.text :reviews
      t.datetime :finished_at
      t.timestamps
    end
  end
end
