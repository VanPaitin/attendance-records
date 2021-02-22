module Api
  module V1
    class InvitesController < ApplicationController
      before_action :ensure_admin

      def index
        render json: Invite.page(params[:page]), status: 200
      end

      def create
        email, role_ids = invite_params.values_at(:email, :role_ids)

        if user = User.find_by(email: email)
          roles = Role.where(id: role_ids)

          roles.each { |role| user.roles << role }

          render json: { success: 'Role successfully added to existing user' }
        else
          invite = Invite.new(email: email, role_ids: role_ids)

          if invite.save
            InviteMailer.with(email: email, token: invite.token).invite_user.deliver

            render json: { success: 'Invite email successfully sent to user' }
          else
            render json: { errors: invite.errors }, status: 422
          end
        end
      end

      def resend
        user_email = params.require(:email)

        if invite = Invite.find_by(email: user_email, recipient_id: nil)
          InviteMailer.with(email: user_email, token: invite.token).invite_user.deliver

          render json: { success: 'Invite email successfully re-sent to user' }
        else
          render json: { error: 'No pending invitations found for this email' }, status: 404
        end
      end

      def destroy
        invite = Invite.find params[:id]

        if invite.recepient_id
          render json: { error: 'User has already accepted this invitation.' }, status: 422
        else
          invite.destroy

          head 204
        end
      end

      private

      def invite_params
        params.permit(:email, role_ids: [])
      end
    end
  end
end
