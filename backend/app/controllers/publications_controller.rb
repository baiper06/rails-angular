class PublicationsController < ApplicationController
  before_action :set_publication, only: [:show, :update, :destroy]

  # GET /publications
  def index
    @publications =  Publication.paginate( page: params[:page], per_page: 5)
								.sorted_by(params[:sorted_by])
								.search_query(params[:search_query])
								.with_author_id(params[:author_id])
    render json: @publications.to_json(:include => :author)
  end

  # GET /publications/1
  def show
    render json: @publication.to_json(:include => :author)
  end

  # POST /publications
  def create
    @publication = Publication.new(publication_params)

    if @publication.save
      render json: @publication, status: :created, location: @publication
    else
      render json: @publication.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /publications/1
  def update
    if @publication.update(publication_params)
      render json: @publication
    else
      render json: @publication.errors, status: :unprocessable_entity
    end
  end

  # DELETE /publications/1
  def destroy
    @publication.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_publication
      @publication = Publication.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def publication_params
      params.require(:publication).permit(:author_id, :title, :body, :date, :time)
    end
end
