class Publication < ApplicationRecord
  belongs_to :author

  scope :sorted_by, ->(sort_option) {
	return nil  if sorted_by.blank?
	# extract the sort direction from the param value.
	direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
	publications = Publication.arel_table
	authors = Author.arel_table
	case sort_option.to_s
	when /^date_/
	  order( publications[:date].send(direction))
	when /^title_/
	  order( publications[:title].lower.send(direction))
	when /^author_name_/
	  Publication.joins(:author).order(authors[:name].lower.send(direction))
	when /^author_email_/
	  Publication.joins(:author).order(authors[:email].lower.send(direction))
	else
	  raise(ArgumentError, "Invalid sort option: #{sort_option.inspect}")
	end
  }

end
