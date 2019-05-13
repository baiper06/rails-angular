class CreatePublications < ActiveRecord::Migration[5.2]
  def change
    create_table :publications do |t|
      t.references :author, foreign_key: true
      t.string :title
      t.text :body
      t.date :date
      t.time :time

      t.timestamps
    end
  end
end
