class Publication < ApplicationRecord
  belongs_to :author

  scope :sorted_by, ->(sort_option) {
	return nil  if sort_option.blank?
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


  scope :search_query, ->(query) {
    return nil  if query.blank?
    # condition query, parse into individual keywords
    terms = query.downcase.split(/\s+/)
    # replace "*" with "%" for wildcard searches,
    # append '%', remove duplicate '%'s
    terms = terms.map { |e|
      (e.gsub('*', '%') + '%').gsub(/%+/, '%')
    }
    # configure number of OR conditions for provision
    # of interpolation arguments. Adjust this if you
    # change the number of OR conditions.
    num_or_conditions = 2
    where(
      terms.map {
        or_clauses = [
          "LOWER( publications.title) LIKE ?",
          "LOWER( publications.title) LIKE ?"
        ].join(' OR ')
        "(#{ or_clauses })"
      }.join(' AND '),
      *terms.map { |e| [e] * num_or_conditions }.flatten
    )
  }

  scope :with_author_id, ->(author_ids) {
	return nil  if author_ids.blank?
    where(:author_id => [*author_ids])
  }

end
