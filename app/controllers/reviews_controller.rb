class ReviewsController < ApplicationController
  def index
    @reviews = Review.order("created_at DESC")
    render :index
  end

  def show
    @review = Review.find(params[:id])
    render :show
  end

  def create
    review = Review.create(review_params)
    render json: review
  end

  def update
    @review = Review.find(params[:id])
    @review.update_attributes(review_params)
    render :show
  end

  def destroy
    review = Review.find(params[:id])
    review.destroy
    head :no_content, status: :ok
  end

  def get_received_reviews
    @reviews = @current_user.review_received.where.not(finished_at: nil)
    render :index
  end

  def get_pending_reviews
    @reviews = @current_user.review_sent.where(finished_at: nil)
    render :index
  end

  def get_sent_reviews
    @reviews = @current_user.review_sent.where.not(finished_at: nil)
    render :index
  end

  private

  def review_params
    params.require(:review).permit(:employee_to_id, :employee_from_id, :rating, :reviews)
  end
end
